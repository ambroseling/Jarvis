const TensorInfo = ({ name, dimensions, dataType, size }) => {
    return (
      <div className="tensor-info">
        <h4>{name}</h4>
        <p>Dimensions: {dimensions}</p>
        <p>Data Type: {dataType}</p>
        <p>Size: {size}</p>
      </div>
    );
  };
  
  export default TensorInfo;