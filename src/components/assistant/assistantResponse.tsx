import { useEffect, useRef } from "react";
import { Loader } from "../common/loader";

export default function AssistantResponse({response, loading}: {response: string, loading: boolean}) {

    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (ref.current) {
        ref.current.style.height = "auto"; // reset first
        ref.current.style.height = `${ref.current.scrollHeight}px`; // expand to fit content
        }
    }, [response]);
    return (
        <div className="mt-4 p-4 border border-gray-300 rounded">
            <h2 className="text-lg font-semibold mb-2">AI Response</h2>
            {loading ? (
                <Loader alignment="left"/>
            ) : (
                <textarea 
                    placeholder="Hi, I am your assistant..."
                    className="mt-4 p-2 border border-gray-300 rounded w-full resize-none overflow-hidden" 
                    readOnly
                    ref={ref}
                    value={response}
                    onChange={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = target.scrollHeight + "px";
                }} />
            )}
        </div>
    )
}