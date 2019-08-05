import React, { Component } from 'react';
import ImageMapEditor from '../components/imagemap/ImageMapEditor';

class App extends Component {
    state = {
        current: 'imagemap',
    }

    onChangeMenu = ({ key }) => {
        this.setState({
            current: key,
        });
    }

    render() {
        const { current } = this.state;
        return (
            <div className="rde-main">
                <head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=0.1" />
                    <meta name="description" content="React Design Editor has started to developed direct manipulation of editable design tools like Powerpoint, We've developed it with react.js, ant.design, fabric.js " />
                    <link rel="manifest" href="./manifest.json" />
                    <link rel="shortcut icon" href="./favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                    <title>React Design Editor</title>
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97485289-3" />
                    <script>
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-97485289-3');
                        `}
                    </script>
                    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
                </head>
                <div className="rde-content">
                    <ImageMapEditor />
                </div>
            </div>
        );
    }
}

export default App;
