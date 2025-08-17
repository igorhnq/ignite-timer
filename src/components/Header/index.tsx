import { HeaderContainer } from "./styles";

import igniteLogo from "../../assets/ignite-logo.svg";
import { ScrollIcon, TimerIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

export function Header() {
    return (
        <HeaderContainer>
            <img src={igniteLogo} />
            <nav>
                <NavLink to="/" title="Timer">
                    <TimerIcon size={24} />
                </NavLink>
                <NavLink to="/history" title="History">
                    <ScrollIcon size={24} />
                </NavLink>
            </nav>

        </HeaderContainer>
    )
}