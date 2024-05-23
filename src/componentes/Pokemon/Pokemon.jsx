import style from './style pokemon/Pokemon.module.css'
const Pokemon = ({name}) =>{

    return(
        <>
       
            <ul className={style.listaPokemon}>
                <li>
                {name}
                </li>
            </ul>
        
        </>
    );
}

export default Pokemon;