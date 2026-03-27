import Swal from 'sweetalert2';

export const showAlert = (icon: 'success' | 'error' | 'warning' | 'info', title: string, text: string) => {
    return Swal.fire({
        icon: icon,
        title: title,
        text: text,
        confirmButtonColor: '#063970',
        background: '#ffffff',
        customClass: {
            title: 'text-xl font-bold',
            popup: 'rounded-none',
            confirmButton: 'py-3 px-6 text-base font-semibold'
        }
    });
};

export const showLoadingAlert = (title: string, text: string = 'Please wait...') => {
    Swal.fire({
        title: title,
        text: text,
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
};

export const closeAlert = () => {
    Swal.close();
};

export const showErrorAlert = (title: string, text: string) => {
    return showAlert('error', title, text);
};
