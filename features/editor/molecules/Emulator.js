  import dynamic from "next/dynamic";
  import { useMemo } from "react";
  import Frame from "react-frame-component";

  const getIFrameInitialContent = (cssLinks) => {

    return `<!DOCTYPE html>
      <html>
          <head>
             ${cssLinks}
          </head>
          <body style=' margin:0;padding:0; -webkit-text-size-adjust:none;'>
              <div></div>
          </body>
      <html>`;
  };

  const Emulator = ({
    cssLinks,
    documentSize,
    scale,
    children
  }) => {
    const {width , height} = documentSize;
    const iframeInitialContent = useMemo(
      () => getIFrameInitialContent(cssLinks),
      [cssLinks]
    );

    return (
      <div
        style={{
          maxWidth: `${width * scale}px`,
          maxHeight: `${height * scale}px`,
        }}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
          }}
          className={`origin-top-left bg-white shadow-lg`}
        >
          <Frame
            initialContent={iframeInitialContent}
            style={{ width: "100%", height: "100%" }}
            key={"LETTER"}
          >
            {children}
          </Frame>
        </div>
      </div>
    );
  };

  export const EmulatorCSR = dynamic(() => Promise.resolve(Emulator), {
    ssr: false,
  });
