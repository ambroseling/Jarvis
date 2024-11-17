#include <napi.h>
#include <sys/mman.h>
#include <sys/stat.h>  // Add this line for stat struct
#include <fcntl.h>
#include <unistd.h>

class MemoryMap : public Napi::ObjectWrap<MemoryMap> {
public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports);
    MemoryMap(const Napi::CallbackInfo& info);
    ~MemoryMap(); // Add destructor

private:
    static Napi::FunctionReference constructor;
    Napi::Value Read(const Napi::CallbackInfo& info);
    Napi::Value Close(const Napi::CallbackInfo& info);
    
    void* mapped_data;
    size_t mapped_size;
    int fd;
    bool is_mapped;

};

Napi::FunctionReference MemoryMap::constructor;

Napi::Object MemoryMap::Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func = DefineClass(env, "MemoryMap", {
        InstanceMethod("read", &MemoryMap::Read),
        InstanceMethod("close", &MemoryMap::Close)
    });

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();
    exports.Set("MemoryMap", func);
    return exports;
}

MemoryMap::MemoryMap(const Napi::CallbackInfo& info) 
    : Napi::ObjectWrap<MemoryMap>(info), 
      mapped_data(nullptr), 
      mapped_size(0), 
      fd(-1), 
      is_mapped(false) {
    Napi::Env env = info.Env();

    if (info.Length() < 1) {
        Napi::TypeError::New(env, "Wrong number of arguments").ThrowAsJavaScriptException();
        return;
    }

    std::string filepath = info[0].As<Napi::String>().Utf8Value();
    fd = open(filepath.c_str(), O_RDONLY);
    if (fd == -1) {
        Napi::Error::New(env, "Could not open file: " + std::string(strerror(errno)))
            .ThrowAsJavaScriptException();
        return;
    }

    struct stat sb;
    if (fstat(fd, &sb) == -1) {
        close(fd);
        fd = -1;
        Napi::Error::New(env, "Could not get file stats: " + std::string(strerror(errno)))
            .ThrowAsJavaScriptException();
        return;
    }

    mapped_size = sb.st_size;
    if (mapped_size == 0) {
        close(fd);
        fd = -1;
        Napi::Error::New(env, "File is empty").ThrowAsJavaScriptException();
        return;
    }

    mapped_data = mmap(nullptr, mapped_size, PROT_READ, MAP_SHARED, fd, 0);
    if (mapped_data == MAP_FAILED) {
        close(fd);
        fd = -1;
        mapped_data = nullptr;
        Napi::Error::New(env, "Could not map file: " + std::string(strerror(errno)))
            .ThrowAsJavaScriptException();
        return;
    }

    is_mapped = true;
}

MemoryMap::~MemoryMap() {
    if (is_mapped && mapped_data != nullptr) {
        munmap(mapped_data, mapped_size);
    }
    if (fd != -1) {
        close(fd);
    }
}

Napi::Value MemoryMap::Read(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (!mapped_data) {
        Napi::Error::New(env, "No mapped data available").ThrowAsJavaScriptException();
        return env.Null();
    }
    //does not create a copy of the data, only a view over the memory
    return Napi::ArrayBuffer::New(env, mapped_data, mapped_size);
}

Napi::Value MemoryMap::Close(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    if (mapped_data) {
        munmap(mapped_data, mapped_size);
        mapped_data = nullptr;
    }
    
    if (fd != -1) {
        close(fd);
        fd = -1;
    }
    
    return env.Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    return MemoryMap::Init(env, exports);
}

NODE_API_MODULE(mmap, Init)