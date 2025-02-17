import { Error } from "@/components/images/error"

export function ShowErrorMessage(props: {error: string}) {
  return (
    <div className="d-flex align-items-center gap-2 p_error">
      <Error />
      <span>{props.error}</span>
    </div>
  );
}