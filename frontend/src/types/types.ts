export interface JobProps {
    id: string;
    title: string;
    posted_date: string;
    company_logo_url: string;
    company_page_url: string;
    salary: string | "";
    company_name: string;
    summary: string;
    location: string | "";
    is_remote: boolean;
    workplace_types: Array<string>;
}