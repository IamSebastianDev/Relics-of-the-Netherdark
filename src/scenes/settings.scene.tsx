import React from "react";
import { Screen } from "../components/ui/screen";
import { useLanguage } from "../providers/language.provider";

export const Settings = React.memo(() => {
    const { translate: t } = useLanguage();

    return <Screen></Screen>;
});
