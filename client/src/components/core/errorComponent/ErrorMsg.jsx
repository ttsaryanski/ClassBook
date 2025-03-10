import { useError } from "../../../context/ErrorContext";

export default function ErrorMsg() {
    const { error } = useError();

    if (!error) {
        return null;
    }

    return (
        <div className="global-error">
            <span>{error}</span>
        </div>
    );
}
