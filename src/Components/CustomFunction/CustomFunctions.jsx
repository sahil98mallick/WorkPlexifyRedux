import Swal from "sweetalert2"

export const WorkingProgess = () => {
    return Swal.fire({
        icon: 'warning',
        title: "Working Progress",
        text: "This Facility Will be Avialable Soon..Thank You.",
        timer: 2000,
        showConfirmButton: true,
    })
}