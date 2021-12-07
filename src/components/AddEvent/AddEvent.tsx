import { useMutation } from "@apollo/client";
import { ChangeEvent, Fragment, useState } from "react";
import { IEvent } from "../../interfaces/types";
import EventBody from "../EventBody/EventBody";
import SAVE_EVENT from '../../gql/saveEvent';
import Spinner from "../UI/Spinner/Spinner";
import Alert from "../UI/Alert/Alert";

const AddEvent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [start, setStart] = useState<string>('');
    const [end, setEnd] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
    const [displayForm, setDisplayForm] = useState<boolean>(true);

    const [saveEvent, { error, loading }] = useMutation<{ saveEvent: IEvent }, { event: IEvent }>(SAVE_EVENT, {
        variables: { event: { id: '', title, start, end, description } }
    });

    const handleOnSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisplayForm(false);
        saveEvent().then(_ => {
            setTitle('');
            setDescription('');
            setStart('');
            setEnd('');
            setDisableSaveBtn(true);
        }).finally(() => setDisplayForm(true))
    }

    return <Fragment>
        {error && <Alert msg="Error occurred while saving event! Please try again later." type="danger" ariaLabel="Warning" fillType="#exclamation-triangle-fill" />}
        {loading ? <Spinner /> :
            <form className="row g-3" onSubmit={handleOnSubmit}>
                {displayForm && <EventBody
                    title={title}
                    start={start}
                    end={end}
                    description={description}
                    onTitle={(title) => setTitle(title)}
                    onDescription={(description) => setDescription(description)}
                    onStart={(start) => setStart(start)}
                    onEnd={(end) => setEnd(end)}
                    onValidate={(valid) => setDisableSaveBtn(!valid)} />}

                <div className="col-12">
                    <button type="submit" className="btn btn-primary" disabled={disableSaveBtn || loading}>Save</button>
                </div>
            </form>
        }
    </Fragment>
};


export default AddEvent;