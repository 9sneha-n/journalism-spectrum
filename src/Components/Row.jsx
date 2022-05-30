import Grid from './Grid'
import HeaderGrid from './HeaderGrid';
import './Row.css';

export default function Row(props) {
    return (
        <div className="Row">
            <HeaderGrid title={props.title} />
            {[...Array(6)].map((j, i) => {
                return <Grid key={i} journalists={props.journalistsMap[i]} updateJournalist={(journoId) => props.updateJournalist(journoId, i)} />
                }
            )}
        </div>
    );
}