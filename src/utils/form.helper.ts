export const getSerializedForm = (form: HTMLFormElement): {} => {
    const inputs = Array.from(form.elements);

    return inputs.reduce((acc: any, input: Element) => {
        const inputElement = input as HTMLInputElement;
        if (!inputElement.name) return acc;

        const checkedValue =
            inputElement.type === "checkbox"
                ? inputElement.checked
                : inputElement.value;
        const value =
            inputElement.type === "number"
                ? Number(inputElement.value)
                : checkedValue;

        if (!inputElement.name.includes("[]")) {
            acc[inputElement.name] = value;
            return acc;
        }

        const prop = inputElement.name.replace("[]", "");
        if (!acc[prop]) acc[prop] = [];
        acc[prop].push(value);
        return acc;
    }, {});
};