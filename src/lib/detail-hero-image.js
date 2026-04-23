const BOOK_PHOTOS = {
    default: 'https://images.unsplash.com/photo-1664222845171-f9ffe4579c1f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    code: 'https://images.unsplash.com/photo-1762242298589-582f5f6c3fb1?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    money: 'https://images.unsplash.com/photo-1767423802472-f5fd07dfdb10?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
};

const PRODUCT_PHOTOS = {
    mouse: 'https://images.unsplash.com/photo-1743862558309-d3e9da38404c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    keyboard: 'https://images.unsplash.com/photo-1743862558309-d3e9da38404c?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    monitor: 'https://images.unsplash.com/photo-1745910020846-3d4d0088d24d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    speaker: 'https://images.unsplash.com/photo-1745910020846-3d4d0088d24d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    hub: 'https://images.unsplash.com/photo-1745910020846-3d4d0088d24d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
    default: 'https://images.unsplash.com/photo-1745910020846-3d4d0088d24d?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=80&w=1600',
};

export const getBookImage = (book) => {
    const value = `${book.name} ${book.brand}`.toLowerCase();

    if (value.includes('money')) {
        return BOOK_PHOTOS.money;
    }

    if (value.includes('code') || value.includes('programmer')) {
        return BOOK_PHOTOS.code;
    }

    return BOOK_PHOTOS.default;
};

export const getProductImage = (product) => {
    const value = `${product.name} ${product.category}`.toLowerCase();

    if (value.includes('mouse')) {
        return PRODUCT_PHOTOS.mouse;
    }

    if (value.includes('keyboard')) {
        return PRODUCT_PHOTOS.keyboard;
    }

    if (value.includes('monitor')) {
        return PRODUCT_PHOTOS.monitor;
    }

    if (value.includes('speaker') || value.includes('audio')) {
        return PRODUCT_PHOTOS.speaker;
    }

    if (value.includes('hub') || value.includes('usb-c')) {
        return PRODUCT_PHOTOS.hub;
    }

    return PRODUCT_PHOTOS.default;
};
