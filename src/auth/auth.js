const verifylogin = () => {
    if (sessionStorage.getItem('userid')) {
        return true
    } else {
        return false
    }
}

const verifyadmin = () => {
    if (sessionStorage.getItem('adminid')) {
        return true
    } else {
        return false
    }
}

const logout = () => {
    if (window.confirm('are you sure you want to logout')) {
        sessionStorage.clear()
        window.location.reload();
    }
}

export {
    verifylogin,
    verifyadmin,
    logout
}