import React, {useState, useRef} from 'react'

function EhAdaApaNih() {
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  const handleInputChange = (event) => {
    setText(event.target.value);
    adjustTextAreaHeight();
  };

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div style={{
      display: "inline-flex",
      padding: "50px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      borderRadius: "20px",
      background: "#1F1F2E",
      boxShadow: "0px 4px 20px 0px rgba(255, 252, 131, 0.40)",
    }}>
      <p style={{
        color: "var(--yellow-yellow-4, #FFE655)",
        textAlign: "center",
        fontFamily: "SomarRounded-Bold",
        fontSize: "32px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "100%", /* 32px */
        letterSpacing: "-0.32px",
      }}>Eh ada apa nih?</p>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
      }}>
        <button style={{
          display: "flex",
          padding: "12px 32px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "12px",
          alignSelf: "stretch",
          flexWrap: "wrap",
          borderRadius: "12px",
          background: "var(--gray-color-gray-200, #F9F9F9)",
          cursor: "pointer",
        }}>
        <textarea
        ref={textAreaRef}
        rows={1}
        placeholder="| Ketik Laporanmu di sini."
        value={text}
        onChange={handleInputChange}
        style={{
          height: 'auto',
          overflowY: 'hidden',
          width: "198px",
          border:"none",
          color: "var(--purple-purple-2, #4909B3)",
          fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
          fontFamily: "SomarRounded-Bold",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "500",
          lineHeight: "150%", /* 24px */
          resize: 'none',
        }}
      />
          </button>
        <button style={{
          display: "flex",
          padding: "12px 32px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "12px",
          alignSelf: "stretch",
          flexWrap: "wrap",
          borderRadius:"12px",
          background: "var(--yellow-yellow-5, #FFFC83)",
          cursor: "pointer"
        }}>
          <p style={{
            color: "var(--purple-purple-4, #7B34E1)",
            textAlign: "center",
            fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
            fontFamily: "SomarRounded-Bold",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%" /* 24px */
          }}>Kirim!</p>
          </button>
        <button style={{
          display: "flex",
          padding: "12px 32px",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "12px",
          alignSelf: "stretch",
          flexWrap: "wrap",
          borderRadius: "12px",
          border: "2px solid var(--yellow-yellow-5, #FFFC83)",
          background: "var(--gray-color-gray-600, #2F2E2E)",
          cursor: "pointer"
        }}>
          <p style={{
            color: "var(--yellow-yellow-5, #FFFC83)",
            fontFeatureSettings: "'cv04' on, 'cv03' on, 'cv02' on, 'cv11' on, 'clig' off, 'liga' off",
            fontFamily: "SomarRounded-Bold",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "150%", /* 24px */
          }}>Gajadi lapor hehe</p>
          </button>
      </div>
    </div>
  );
}

export default EhAdaApaNih