import React from 'react'

const YahTemanmu = () => {
  return (
    <div style={{
      display: "flex",
      width: "266px",
      height: "376px",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "40px",
      borderRadius: "20px",
      background: "#1F1F2E",
      boxShadow: "0px 4px 20px 0px rgba(255, 252, 131, 0.40)",
    }}>
      <div style={{
        color: "var(--yellow-yellow-4, #FFE655)",
        textAlign: "center",
        fontFeatureSettings: "'calt' off",
        fontFamily: "Somar Rounded",
        fontSize: "24px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "24px", /* 100% */
        letterSpacing: "-0.24px",
      }}>
        <p>Yah temanmu mengakhiri percakapan nih
        <br />
        :”(
        </p>
      </div>
      <div style={{
        display: "flex",
        padding: "12px 2px",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        borderRadius: "4px",
        background: "var(--yellow-yellow-5, #FFFC83)",
        cursor: "pointer"
      }}>
        <p style={{
          color: "var(--purple-purple-2, #4909B3)",
          fontFeatureSettings: "'calt' off",
          fontFamily: "Somar Rounded",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: "700",
          lineHeight:"24px", /* 150% */
          letterSpacing: "-0.16px",
        }}>Kembali ke Find Match</p>
      </div>
      <p style={{
        color: "var(--wf-base-white, #FFF)",
        textAlign: "center",
        fontFeatureSettings: "'calt' off",
        fontFamily: "Somar Rounded",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: "24px", /* 171.429% */
      }}>p.s. Rekaman percakapan ini
          <br />
          ini otomatis tersimpan
          <br />
          di History-mu ya!
      </p>
    </div>
  )
}

export default YahTemanmu