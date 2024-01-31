import { useState } from "react";
import {Button, Form, FormRow, Input} from "../ui/index.js";
import { useGameContext } from "../context/game/GameContext.jsx";

const AddFunds = () => {

    const { addFunds } = useGameContext()
    const [reloadState, setReloadState] = useState(500)

    return (
        <Form>
            <FormRow label="Reload Amount">
                <Input
                    type="number"
                    name="funds"
                    value={reloadState}
                    min='100' max='1000000000'
                    onChange={(e)=>setReloadState(e.target.value)}/>
            </FormRow>
            <Button onClick={()=>addFunds(reloadState)}>Add Funds</Button>;
        </Form>
    );
};

export default AddFunds;