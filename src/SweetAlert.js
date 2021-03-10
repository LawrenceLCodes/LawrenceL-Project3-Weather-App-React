// Sweet Alert JavaScript component used to improve alerts for users.

import React, { Component } from "react";  
import Swal from "sweetalert2";  

export default class AlertError extends Component {

    constructor() {
        super();
        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleSubmit() {
        Swal.fire({
            ...this.props
        });
    }

    render() {
        return (
            <div>
                <button class="btn btn-danger" onSubmit={this.HandleClick}>
                    Show Error Alert
                </button>
            </div>
        );
    }
}


// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

//     const mySwal = withReactContent(Swal)

//     mySwal({
//         title: 'Error!',
//         text: 'Could not load your weather data, please try again',
//         icon: error,
//         timer: 3000
//         }
//     });
    // Catch is used to generate an alert if an incompatible city name has been entered. 
    // .catch(error => mySwal({
    //     title: "City Name Not Found",
    //     icon: "error",
    //     text: "Please check your entry and try again!",
    //     timer: 4000,
    // })
    // );
    

// export default mySwal;