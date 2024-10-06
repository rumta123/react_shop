import React from 'react'

export default function ProductImg({ url, image, alt }) {
    return (
        <img src={`${url}${image}`} alt={alt} />
    );
}
