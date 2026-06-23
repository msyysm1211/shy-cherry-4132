/// <reference types="react" />
export declare const revalidate = 30;
export declare function generateStaticParams(): Promise<{
    id: string;
}[]>;
export default function BlogPost({ params }: {
    params: {
        id: string;
    };
}): import("react").JSX.Element;
