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
        return mySwal.fire(<p>Shorthand works too</p>)
    })

export default mySwal;