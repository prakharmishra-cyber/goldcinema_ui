/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'customShadow':'0px 0px 4px 4px #ae9bc8',
        'LoginShadow': '-1px 5px 15px 0 #b99c70',
        'cardShadow': '0 0 10px 0 rgb(0 0 0 / 20%)'
      },
      colors: {
        'regal-blue': '#243c5a',
        'red-800': '#ae9169',
        'recharge-bg':'#f2f2f2',
        'withdraw': '#f2f2f2',
        'selected':'#2a00a7',
        'nselected':'#dbdbdb',
        'pre_sale':"#efefef",
        'input_bg':"#e8f0fe",
        'cstGray': '#e1e2e4',
        'my':'#b99c70'
      },
      animation: {
        marquee: 'marquee 8s linear infinite',
        marquee2: 'marquee2 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        loader: {
          '0%, 50%': { width: '10px' },
          '50%, 100%': { width:'100px' }
        }
      },
    },
  },
  plugins: [],
}