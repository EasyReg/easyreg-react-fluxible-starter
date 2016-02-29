import React from 'react';

class Html extends React.Component {
    render () {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <title>{this.props.title}</title>
                    <link rel="stylesheet" href="assets/css/styles.css" />
                </head>
                <body>
                    <div id="app" className="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
                    <script src="assets/js/client.js" defer></script>
                </body>
            </html>
        );
    }
}

export default Html;
