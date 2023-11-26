const DefaultInscription = () => {
    return (
        <div className="error" data-testid="default-inscription">
            <div className="number">4</div>
            <div className="illustration" data-testid="illustration">
                <div className="circle" data-testid="circle"></div>
                <div className="clip" data-testid="clip">
                    <div className="paper">
                        <div className="face">
                            <div className="eyes" data-testid="eyes">
                                <div className="eye eye-left"></div>
                                <div className="eye eye-right"></div>
                            </div>
                            <div className="rosyCheeks rosyCheeks-left" data-testid="rosyCheeks"></div>
                            <div className="rosyCheeks rosyCheeks-right"></div>
                            <div className="mouth" data-testid="mouth"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="number">4</div>
        </div>
    );
};

export default DefaultInscription;
