/*
  _    _              ___  _                _           __ 
   /_\  (_) _ _  __ _  / __|| | ___  _  _  __| |   __ __ / / 
  / _ \ | || '_|/ _` || (__ | |/ _ \| || |/ _` |   \ V // _ \
 /_/ \_\|_||_|  \__,_| \___||_|\___/ \_,_|\__,_|    \_/ \___/

 Developed By Swiftly. 
 * The lost error

*/

export default function NotFound() {
  document.querySelector(
    "title"
  ).innerText = `Could not find what you were looking for`;
  var image = new Image();
  image.src = "https://swiftlystatic.vercel.app/airacloud/coming-soon.png";

  image.onload = function () {
    var element = document.lastChild;
    element.classList.add("background");
  };

  document.body.innerHTML = `
    <div class="elements">
        <h1 id="text1">Could not find what you were looking for</h1>
        <a href="https://fast-airacloud-mix.vercel.app/home/"><button>Turn back</button></a>
    </div>
    <style>
        /* 
            AiraCloud Generated CSS - Swiftly Team
            All rights reserved
        */

        @import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Jockey+One&display=swap');

        a {
            text-decoration: none;
        }

        html, body {
            margin: 0;
            overflow-x: hidden;
            padding: 0;
            background: none;
        }

        html {
            background-color: #07080A;
            transition-duration: 0.5s;
        }

        html.background {
            background-image: url('https://swiftlystatic.vercel.app/airacloud/coming-soon.png');
            background-size: cover;
            background-repeat: no-repeat;
        }

        * {
            font-family: 'Atkinson Hyperlegible', Poppins, Montserrat, Outfit, Arial, sans-serif, --system-ui;
            color: white;
            transition-duration: 0.1s;
        }

        div.elements {
            display: flex;
            height: 100vh;
            flex-direction: column;
            justify-content: center;
            
        }


        @media only screen and (min-width: 613px) {
            div.elements {
                margin-left: 55px;
            }
        }


        @media only screen and (max-width: 757px) {
            #sadface {
                opacity: 0;
            }
        }

        @media only screen and (max-width: 613px) {
            div.elements {
                width: 100vw;
                align-items: center;
            }
            div.elements * {
                text-align: center;
            }
        }

        #sadface {
            font-family: 'Jockey One';
            leading-trim: both;
            text-edge: cap;
            font-family: Jockey One;
            font-size: 180px;
            font-style: normal;
            font-weight: 400;
            line-height: normal; 
            position: fixed;
            right: 78px;
            top: -13px;
        }

        #text1 {
            leading-trim: both;
            text-edge: cap;
            font-family: 'Atkinson Hyperlegible', Poppins, Montserrat, Outfit, Arial, sans-serif, --system-ui;
            font-size: 70px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }

        #text2 {
            leading-trim: both;
            text-edge: cap;
            font-family: 'Atkinson Hyperlegible', Poppins, Montserrat, Outfit, Arial, sans-serif, --system-ui;
            font-size: 40px;
            font-style: normal;
            line-height: normal; 
        }

        button {
            border-radius: 1000px;
            background: #0064C8; 
            display: flex;
            width: 270px;
            height: 80px;
            justify-content: center;
            align-items: center;
            gap: 10px;
            flex-shrink: 0; 
            font-size: 30px; 
            font-weight: bold;
            border: 0;
        }
        button:active {
            opacity: 0.9;
            transform: scale(0.95);
        }
        button:hover {
            background: #004f9e; 
        }
    </style>
`;
}
