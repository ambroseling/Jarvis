export function renderTensorInfo(tensorName, tensorShape, tensorDatatype, tensorMemory) {
    return `
  <div style="
      width: 80%;
      margin: 20px auto;
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #ccc;
      text-align: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">
    <div class="tensor-info" style="text-align: left;">
      <div class="info-row">
        <div class="info-container" style="display: flex; align-items: center;">
          <div class="label-container">
            <span class="label">Tensor Name:</span>
          </div>
          <div class="value-container" style="margin-left: 10px;">
            <span class="value" id="tensor-name">${tensorName}</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-container" style="display: flex; align-items: center;">
          <div class="label-container">
            <span class="label">Shape:</span>
          </div>
          <div class="value-container" style="margin-left: 10px;">
            <span class="value" id="tensor-shape">${tensorShape}</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-container" style="display: flex; align-items: center;">
          <div class="label-container">
            <span class="label">Datatype:</span>
          </div>
          <div class="value-container" style="margin-left: 10px;">
            <span class="value" id="tensor-datatype">${tensorDatatype}</span>
          </div>
        </div>
      </div>
      <div class="info-row">
        <div class="info-container" style="display: flex; align-items: center;">
          <div class="label-container">
            <span class="label">Memory:</span>
          </div>
          <div class="value-container" style="margin-left: 10px;">
            <span class="value" id="tensor-memory">${tensorMemory}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

// Make the function available globally
window.renderTensorInfo = renderTensorInfo;