import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field/Field";
import Select from "../../components/Select/Select";
import Button, { BUTTON_TYPES } from "../../components/Button/Button";

const mockContactApi = () =>
    new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);

    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            const data = new FormData(evt.target);
            console.log(Object.fromEntries(data));

            setSending(true);
            // Nous essayons d'appeler mockContactApi

            try {
                await mockContactApi();
                setSending(false);
                onSuccess(); // Appel de la fonction onSuccess en cas de succès
            } catch (err) {
                setSending(false);
                onError(err);
            }
        },
        [onSuccess, onError]
    );

    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field placeholder="" label="Nom" name="Nom" />

                    <Field placeholder="" label="Prénom" name="Prénom" />
                    <Select selection={["Personel", "Entreprise"]} onChange={() => null} label="Personel / Entreprise" type="large" titleEmpty />

                    <Field placeholder="" label="Email" name="Email" type={FIELD_TYPES.InputEmail} />
                    <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                        {sending ? "En cours" : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field placeholder="message" label="Message" type={FIELD_TYPES.TEXTAREA} name="msg" />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
};

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => {}, // Fonction vide par défaut
};

export default Form;
