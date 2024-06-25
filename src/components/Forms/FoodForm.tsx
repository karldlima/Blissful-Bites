import { useState } from "react";

import { Button } from "../../components";
import { Food } from "../../graphql";

interface FoodFormProps {
  onSubmit: (_formData: Food) => void;
}

const FoodForm = ({ onSubmit }: FoodFormProps): JSX.Element => {
  const [formData, setFormData] = useState<Food>({
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
    onSubmit(formData as Food);
    setFormData({ id: "", type: "", name: "", topping: "" });
  };

  const isDisabled = Object.values(formData).some((value) => !value?.length);

  const inputFields: { placeholder: string; name: keyof Food }[] = [
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
      {inputFields.map(({ placeholder, name }, i) => (
        <div className="input-container" key={i}>
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
      ))}
      <Button type="submit" disabled={isDisabled}>
        Add Food
      </Button>
    </form>
  );
};

export default FoodForm;
