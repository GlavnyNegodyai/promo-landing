import Button from "./button";

function Input({type, id, children, required}: {type: string, id: string, children: string, required?: boolean}) {
  return (
    <div className="mb-6">
      <label htmlFor={id}>{children}{required ? <span className="text-(--orange)">*</span>: ""}</label>
      <input
        type={type}
        className="bg-(--white) rounded-2xl border-(--green) border-2 h-12 w-full mt-3 p-2"
        id={id}
        required={required}
      />
    </div>
  );
}

export default function Form({extraClass}: {extraClass?: string}) {
  return (
    <form action="" className={`w-full ${extraClass ? extraClass: ""}`}>
      <div className="grid grid-cols-2 gap-6">
        <Input type="text" id="name" required>
          Name
        </Input>
        <Input type="text" id="surname" required>
          Surname
        </Input>
      </div>
      <div>
        <Input type="email" id="email" required>
          Email
        </Input>
      </div>
      <div>
        <Input type="number" id="phone-number" required>
          Phone number
        </Input>
      </div>
      <Button className="bg-(--green)">Submit</Button>
    </form>
  );
}
