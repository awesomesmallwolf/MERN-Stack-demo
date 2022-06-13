import { motion } from "framer-motion";
import { atom, useRecoilState } from "recoil";


const localStorageEffect = (key:string) => ({setSelf, onSet}:any) => {

    const savedValue = localStorage.getItem(key) ?? 'dark';
    if (savedValue != null) {
        document.documentElement.className = savedValue;
        setSelf(savedValue);
    }
  
    onSet((newValue:any, oldValue:any, isReset:boolean) => {

      if(isReset) localStorage.removeItem(key);
      else {
        localStorage.setItem(key, newValue);
        document.documentElement.className = newValue;
      }

    });
};

export const isDarkTheme = atom<string>({
    key: 'app-theme', // unique ID (with respect to other atoms/selectors)
    default: 'dark', // default value (aka initial value)
    effects:[
        localStorageEffect('is-dark-theme')
    ]
});

export const ToogleTheme = ({viewName}:any) =>{

    const [theme, setTheme] = useRecoilState(isDarkTheme);

    const toogle = () => theme === 'light' ? setTheme('dark') : setTheme('light');
    
    const activeClass ="cursor-pointer text-green-500";
    const inactiveClass = "cursor-pointer text-gray-300";

    return <ul className="flex justify-end space-x-2 px-4">
        <motion.li className={ theme === 'light' ? activeClass : inactiveClass}
        whileHover={{ scale:1.05 }}
        onClick={toogle}>light</motion.li>
        <motion.li className={ theme === 'dark' ? activeClass : inactiveClass}
        whileHover={{ scale:1.05 }}
        onClick={toogle}>dark</motion.li>
    </ul>
}