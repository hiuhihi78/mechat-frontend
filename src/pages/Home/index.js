import { SignIn } from "~/pages/SignIn"
import { clsx } from 'clsx';
import styles from "./Home.module.scss"

export function Home() {

    return (
        <>
            <p className={clsx(styles.title)}>Home page</p>
            <SignIn />
        </>
    )
}