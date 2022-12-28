function Description() {

    const [visible, setVisible] = React.useState(true)

    function toggleVisibility() {
        setVisible(p => !p)
    }

    return (<div>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
        <div class="w3-container">
            <div class="wrapper side-panel-open">
                <button onClick={() => { toggleVisibility() }} class="side-panel-toggle" type="button">
                    <span class="material-icons sp-icon-open">question_mark</span>
                    <span class="material-icons sp-icon-close"
                    >keyboard_double_arrow_left</span
                    >
                </button>
                {visible &&
                    <div class="side-panel">
                        <p class="blocksatz"><b>Description</b></p>
                        <p>With the Shiprandomizer you can choose a ship at random.</p>
                        <p>
                            Under Settings you can choose the Tier level from 1-10 + Superships.
                        </p>
                        <p>
                            Either select all ships under "select all" or just select the ships
                            you would like to sail from.
                        </p>
                        <p>Your settings will be saved.</p>
                        <p>A free community project for World of Warships (TM)</p>
                        <p>(c) 2022 HighTower & Graf_d</p>
                    </div>
                }
            </div>
        </div>
        <div class="radar"></div>
    </div>);
}