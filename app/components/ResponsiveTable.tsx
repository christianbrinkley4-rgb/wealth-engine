import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";

type PartProps = {
  children?: ReactNode;
  role?: string;
  colSpan?: number;
  scope?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

function parts(children: ReactNode, tag: string) {
  return Children.toArray(children).filter(
    (child): child is ReactElement<PartProps> =>
      isValidElement<PartProps>(child) && child.type === tag,
  );
}

function textOf(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (
        !isValidElement<PartProps>(child) ||
        child.props["aria-hidden"] === true ||
        child.props["aria-hidden"] === "true"
      )
        return "";
      return textOf(child.props.children);
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Wide tables retain column headers for assistive technology and show each
 * value with its header on phones, keeping dollar amounts intact. No viewport
 * JavaScript is needed; the same markup works on the server and the client. */
export function ResponsiveTable({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"table">) {
  const head = parts(children, "thead")[0];
  const headerRow = parts(head?.props.children, "tr")[0];
  const headers = parts(headerRow?.props.children, "th");
  const labels = headers.map((header) => textOf(header.props.children));
  const readable =
    labels.length > 2 &&
    labels.every(Boolean) &&
    headers.every((header) => !header.props.colSpan || header.props.colSpan === 1);

  const sections = readable
    ? Children.toArray(children).map((section) => {
        if (
          !isValidElement<PartProps>(section) ||
          (section.type !== "tbody" && section.type !== "tfoot")
        )
          return section;
        return cloneElement(section, {
          role: "rowgroup",
          children: Children.toArray(section.props.children).map((row) => {
            if (!isValidElement<PartProps>(row) || row.type !== "tr") return row;
            let column = 0;
            return cloneElement(row, {
              role: "row",
              children: Children.toArray(row.props.children).map((cell) => {
                if (!isValidElement<PartProps>(cell) || (cell.type !== "td" && cell.type !== "th"))
                  return cell;
                const span = cell.props.colSpan ?? 1;
                const label = span === 1 ? labels[column] : undefined;
                column += span;
                return cloneElement(cell, {
                  role:
                    cell.type === "th"
                      ? cell.props.scope === "col"
                        ? "columnheader"
                        : "rowheader"
                      : "cell",
                  children: (
                    <>
                      {label ? (
                        <span className="readable-cell-label" aria-hidden>
                          {label}
                        </span>
                      ) : null}
                      {cell.props.children}
                    </>
                  ),
                });
              }),
            });
          }),
        });
      })
    : children;

  return (
    <table
      {...props}
      role={props.role ?? "table"}
      className={[className, readable ? "readable-table" : ""].filter(Boolean).join(" ")}
    >
      {sections}
    </table>
  );
}
