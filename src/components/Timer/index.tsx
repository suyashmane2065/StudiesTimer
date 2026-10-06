import { useEffect, useRef, useState } from 'react';
import { timeConverter } from '../../common/utils/time';
import { Tarefa } from '../../types/tarefa';
import Button from '../Button';
import Clock from './Clock';
import S from './style.module.scss';

interface Props {
  selected: Tarefa | undefined;
  endTarefa: () => void;
}

export function Timer({ selected, endTarefa }: Props) {
  const [time, setTime] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (selected?.tempo) {
      setTime(selected.tempo);
    }
  }, [selected]);

  function regressiva(contador: number = 0) {
    timeoutRef.current = setTimeout(() => {
      if (contador > 0) {
        setTime(contador - 1);
        regressiva(contador - 1);
      } else {
        endTarefa();
      }
    }, 1000);
  }

  function resetTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setTime(selected?.tempo || 0);
  }

  return (
    <div className={S.timer}>
      <p className={S.title}>Escolha um card e inicie o cronômetro</p>

      <div className={S.clockWrapper}>
        <Clock time={time} />
      </div>

      <Button title="Iniciar" onClick={() => regressiva(time)} />
      <Button title="Resetar" onClick={resetTimer} />
    </div>
  );
}
