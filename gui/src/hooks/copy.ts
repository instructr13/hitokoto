import { writeText } from "@tauri-apps/api/clipboard";
import { toast } from "react-toastify";

export const useCopy = (localizedTarget: string, value: string) => {
    return [
        () => {
            void writeText(value).then(() => {
                toast.success(`${localizedTarget}をコピーしました`);
            });
        }
    ];
};
