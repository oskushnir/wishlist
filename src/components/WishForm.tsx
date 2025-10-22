import { Button } from "./Button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type WishFormProps = {
  onClose?: () => void;
  onSubmit?: () => void;
  wishName: string;
  setWishName: (wishName: string) => void;
  wishDescription: string;
  setWishDescription: (wishDescription: string) => void;
  wishImg: string;
  setWishImg: (wishImg: string) => void;
  wishPrice: number;
  setWishPrice: (wishPrice: number) => void;
  submitButtonTitle: string;
};

export const WishForm = ({
  onClose,
  onSubmit,
  wishName,
  setWishName,
  wishDescription,
  setWishDescription,
  wishImg,
  setWishImg,
  wishPrice,
  setWishPrice,
  submitButtonTitle,
}: WishFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
        onClose?.();
      }}
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="wish-name">Wish Name</FieldLabel>
              <Input
                id="wish-name"
                placeholder="MacBook Air"
                required
                value={wishName}
                onChange={(e) => setWishName(e.target.value)}
              />
              <FieldDescription>Enter the name of your wish item</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="wish-description">Description</FieldLabel>
              <Textarea
                id="wish-description"
                placeholder="Ultralight laptop designed for all-day work and travel..."
                className="resize-none"
                rows={4}
                value={wishDescription}
                onChange={(e) => setWishDescription(e.target.value)}
              />
              <FieldDescription>Describe your wish item in detail</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="wish-image">Image URL</FieldLabel>
              <Input
                id="wish-image"
                placeholder="https://example.com/image.jpg"
                type="url"
                value={wishImg}
                onChange={(e) => setWishImg(e.target.value)}
              />
              <FieldDescription>
                Add a link to the image of your wish item
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="wish-price">Price</FieldLabel>
              <Input
                id="wish-price"
                placeholder="1199"
                type="number"
                required
                value={String(wishPrice)}
                onChange={(e) => setWishPrice(Number(e.target.value))}
              />
              <FieldDescription>Enter the price in dollars</FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Field>
          <div className="flex gap-3">
            <Button title="Cancel" variant="outline" type="button" className="flex-1" onClick={onClose} />
            <Button title={submitButtonTitle} type="submit" className="flex-1" />
          </div>
        </Field>
      </FieldGroup>
    </form>
  );
};
