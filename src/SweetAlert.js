// Sweet Alert JavaScript component used to improve alerts for users.

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

    const mySwal = withReactContent(Swal)

    mySwal.fire({
        title: <p>Hello World</p>,
        footer: 'Copyright 2018',
        didOpen: () => {
            // `MySwal` is a subclass of `Swal`
            //   with all the same instance & static methods
            mySwal.clickConfirm()
        }
    }).then(() => {
        return mySwal.fire(<p>Welcome!</p>)
    })
    // Catch is used to generate an alert if an incompatible city name has been entered. 
    // .catch(err => mySwal({
    //     title: "City Name Not Found",
    //     icon: "error",
    //     text: "Please check your entry and try again!",
    //     timer: 4000,
    // })
    // );

export default mySwal;