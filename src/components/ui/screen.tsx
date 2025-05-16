import { PropsWithChildren } from "react";

export const Screen = ({ children }: PropsWithChildren) => {
    return (
        <div className="screen-outer">
            <div className="screen-inner">{children}</div>
        </div>
    );
};
