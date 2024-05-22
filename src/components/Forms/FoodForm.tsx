import { useState } from "react";

import { Button } from "../../components";

import "./FoodForm.css";

interface FoodFormProps<T> {
  onSubmit: (_formData: T) => void;
}

const FoodForm = <T,>({ onSubmit }: FoodFormProps<T>): JSX.Element => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    name: "",
    topping: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as T);
    setFormData({ id: "", type: "", name: "", topping: "" });
  };

  const isValid = Object.values(formData).some((value) => !value.length);

  const inputFields = [
    { placeholder: "ID", name: "id" },
    { placeholder: "Type", name: "type" },
    { placeholder: "Name", name: "name" },
    { placeholder: "Topping", name: "topping" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="foodform"
      aria-describedby="form-heading"
    >
      {inputFields.map(
        ({ placeholder, name }: { placeholder: string; name: string }) => (
          <div className="input-container">
            <label htmlFor={name}>{placeholder}</label>
            <input
              id={name}
              key={name}
              type="text"
              placeholder={placeholder}
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        )
      )}
      <Button type="submit" disabled={isValid}>
        Add Food
      </Button>
    </form>
  );
};

export default FoodForm;
