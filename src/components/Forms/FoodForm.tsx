import { useState } from "react";

import { Button } from "../../components";

interface FoodFormProps<T> {
  onSubmit: (_formData: T) => void;
}

const FoodForm = <T,>({ onSubmit }: FoodFormProps<T>): JSX.Element => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    type: "",
    topping: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
    setFormData({ id: "", name: "", type: "", topping: "" });
  };

  const isValid = Object.values(formData).some((value) => !value.length);

  const inputFields = [
    { placeholder: "ID", name: "id" },
    { placeholder: "Name", name: "name" },
    { placeholder: "Type", name: "type" },
    { placeholder: "Topping", name: "topping" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      {inputFields.map(
        ({ placeholder, name }: { placeholder: string; name: string }) => (
          <input
            key={name}
            type="text"
            placeholder={placeholder}
            name={name}
            value={formData[name]}
            onChange={handleChange}
          />
        )
      )}
      <Button type="submit" disabled={isValid}>
        Add Food
      </Button>
    </form>
  );
};

export default FoodForm;
