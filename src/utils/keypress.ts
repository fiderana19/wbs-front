export const handleNumberKeyPress =async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.which || e.keyCode;
  
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
}