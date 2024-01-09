import * as React from "react"

const MenuIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={25}
        height={25}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <g clipPath="url(#a)">
            <path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M3 6h18M3 12h18M3 18h18"
            />
        </g>
        {/* <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs> */}
    </svg>
)
export default MenuIcon
