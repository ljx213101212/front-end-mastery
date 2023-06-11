import React, { useState, useEffect, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import associateHTML from 'raw-loader!./raw_meta.html';
import associateJS from 'raw-loader!./raw_js.js';
import logo from '../assets/darts.jpg';
// 用来测试公共资源的splitchunks
import { common } from '../common';
// 加载自己打包的大整数加法应用
import {largeNumberAdd} from 'large-number-ljx';

function Search() {
  const [dynamicComponent, setDynamicComponent] = useState(<></>);
  useEffect(() => {
    common();
    // inline meta data
    document.head.innerHTML += associateHTML;
    // inline javascript
    const scriptTag = document.createElement('script');
    scriptTag.innerHTML += associateJS;
    document.body.appendChild(scriptTag);
  }, []);

  const dynamicLoadComponent = async () => {
    // 动态加载
    const text = await import('./text.js');
    setDynamicComponent(text.default);
  };

  return (
    <div className="search-text">
      Click the image to load dynamic component
      <img src={logo} className="search-image" onClick={() => dynamicLoadComponent()} />
      {dynamicComponent}
      {largeNumberAdd("999", "11")} {"is expected equals to 1010"}
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<StrictMode><Search /></StrictMode>);
