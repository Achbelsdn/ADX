import { useState } from "react";
import ClickIndicator from "./ClickIndicator";

const MapLink = () => {
    const [active, setActive] = useState(false);

    return (
        <section className="w-screen h-[90vh] bg-[#181717] flex flex-col justify-center items-center text-center">
            <div>
                <p className="text-[0.7rem] font-bold text-[#a79c8d] choose-subtitle">
                    Notre agence, accessible partout
                </p>

                <h1 className="text-[5vw] leading-15 tracking-tight mt-5 text-[#f4efe7]">
                    ADX® est basée à Cotonou,<br />
                    au Bénin, avec une portée<br />
                </h1>
            </div>

            <ClickIndicator active={active} />

            <a
                href="#"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                className="text-[#b1a696] text-[5vw] underline hover:text-[#f4efe7]"
            >
                internationale.
            </a>
        </section>
    );
};

export default MapLink;