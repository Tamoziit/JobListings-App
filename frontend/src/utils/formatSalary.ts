function formatSalary(input: string): string {
    if (input.trim() === "") {
        return "";
    }

    const regex = /(?:USD\s*|\$)?(\d+(?:\.\d{2})?)\s*-\s*(?:USD\s*|\$)?(\d+(?:\.\d{2})?)/;

    if (/^\$\d+(?: - \$\d+)?$/.test(input.trim())) {
        return input.trim();
    }

    const match = input.match(regex);
    if (match) {
        const min = parseFloat(match[1]);
        const max = parseFloat(match[2]);

        return `$${Math.round(min)} - $${Math.round(max)}`;
    }

    return input.trim();
}

export default formatSalary;