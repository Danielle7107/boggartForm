import React, { useState } from 'react';
import './PainSurveyForm.css';  // Import the CSS file

const PainSurveyForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        date: '',
        age: '',
        gender: '',
        painType: '',
        painDurationValue: '',
        painDurationUnit: 'ימים',
        painIntensity: 0,
        emotionalPositivity: 0,
        arousalLevels: 0,
        painLocation: '',
        painSide: 0,
        painDirection: 0,
        painVertical: 0,
        painDetails2: '',
        painOrgan: '',
        painStartEnd: '',
        painLength: 0,
        painThickness: 0,
        painColor: '',
        painShape: 0,
        painBorder: '',
        painDensity: 0,
        painTexture: 0,
        painHardness: 0,
        painDescription: [],
        painSymbols: '',
        painMovement: '',
        painRhythm: '',
        painSound: '',
        painPattern: '',
        painActivitiesWorsen: '',
        painActivitiesRelieve: '',
    });

    const [page, setPage] = useState(1);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                const newDescription = checked
                    ? [...prevData.painDescription, value]
                    : prevData.painDescription.filter((desc) => desc !== value);
                return { ...prevData, painDescription: newDescription };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (response.ok) {
            alert('Form submitted successfully!');
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    const handleDebugSubmit = async () => {
        const response = await fetch('http://localhost:5000/api/debug_submit', {
            method: 'POST',
        });
        const result = await response.json();
        if (response.ok) {
            alert('Debug form submitted successfully!');
        } else {
            alert(`Error: ${result.message}`);
        }
    };

    const nextPage = () => setPage(page + 1);
    const prevPage = () => setPage(page - 1);

    return (
        <form onSubmit={handleSubmit}>
            {page === 1 && (
                <div>
                    <div className="form-group">
                        <label htmlFor="email">1. אימייל:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">2. מה התאריך של היום:</label>
                        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">3. גיל:</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>4. מין:</label>
                        <input type="radio" name="gender" value="זכר" checked={formData.gender === 'זכר'} onChange={handleChange} required /> זכר
                        <input type="radio" name="gender" value="נקבה" checked={formData.gender === 'נקבה'} onChange={handleChange} required /> נקבה
                        <input type="radio" name="gender" value="מעדיפ/ה לא לומר" checked={formData.gender === 'מעדיפ/ה לא לומר'} onChange={handleChange} required /> מעדיפ/ה לא לומר
                    </div>
                    <button type="button" onClick={nextPage}>הבא</button>
                    <button type="button" onClick={handleDebugSubmit}>שלח (Debug)</button>
                </div>
            )}

            {page === 2 && (
                <div>
                    <div className="survey-description">
                        <p>אנחנו עכשיו נעביר שאלון שיאפשר לך מבט מעמיק על הכאב שלך. קח לך כמה דקות לשבת בשקט ולהתרכז בכאב לפני שנתחיל.</p>
                        <p>קח לך כמה דקות להתרכז בכאב אותו אתה חווה, נסה לתאר אותו במדויק ולהבין אותו לעומק.</p>
                    </div>
                    <div className="form-group">
                        <label>5. מהתחושה שלך האם הכאב אותו את/ה חווים מגיע ממקור פיזיולוגי או מקור רגשי?</label>
                        <input type="radio" name="painType" value="רגשי" checked={formData.painType === 'רגשי'} onChange={handleChange} required /> רגשי
                        <input type="radio" name="painType" value="פיזי" checked={formData.painType === 'פיזי'} onChange={handleChange} required /> פיזי
                    </div>
                    <div className="form-group">
                        <label htmlFor="painDurationValue">6. כמה זמן הכאב מלווה אותך?</label>
                        <input type="number" id="painDurationValue" name="painDurationValue" value={formData.painDurationValue} onChange={handleChange} required />
                        <select name="painDurationUnit" value={formData.painDurationUnit} onChange={handleChange} required>
                            <option value="ימים">ימים</option>
                            <option value="שבועות">שבועות</option>
                            <option value="חודשים">חודשים</option>
                            <option value="שנים">שנים</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>7. בסולם של 0 עד 10, כאשר 0 הוא ללא כאב ו-10 הוא הכאב הגרוע ביותר שניתן להעלות על הדעת, כיצד היית מדרג את עוצמת הכאב שלך כרגע?</label>
                        <div className="scale-container">
                            <span>0 לא כואב</span>
                            <input type="range" name="painIntensity" min="0" max="10" value={formData.painIntensity} onChange={handleChange} required />
                            <span>10 הכי כואב</span>
                        </div>
                        <div className="scale-value">{formData.painIntensity}</div>
                    </div>
                    <button type="button" onClick={prevPage}>הקודם</button>
                    <button type="button" onClick={nextPage}>הבא</button>
                </div>
            )}

             {page === 3 && (
                <div>
                    <div className="survey-description">
                       <p>סעיף  מצב רגשי- כעת תרא/י שתי סקאלות המתארות חוויה רגשית. </p>
                    </div>
                    <div className="form-group">
                        <label>אנא דרג איך את/ה מרגיש/ה כרגע כאשר 0 זה שלילי מאוד ו-10 זה חיובי מאוד.</label>
                        <div className="scale-container">
                            <span>0 שליליים</span>
                            <input type="range" name="emotionalPositivity" min="0" max="10" value={formData.emotionalPositivity} onChange={handleChange} required />
                            <span>10 חיוביים</span>
                        </div>
                        <div className="scale-value">{formData.emotionalPositivity}</div>
                    </div>
                    <div className="form-group">
                        <label>אנא תאר את מידת העוררות שאת/ה מרגיש/ה ברגע זה כאשר 0 זה רגוע ושלו ו-10 זה מרוגש וערני.</label>
                        <div className="scale-container">
                            <span>0 נמוכה</span>
                            <input type="range" name="arousalLevels" min="0" max="10" value={formData.arousalLevels} onChange={handleChange} required />
                            <span>10 גבוהה</span>
                        </div>
                        <div className="scale-value">{formData.arousalLevels}</div>
                    </div>
                    <button type="button" onClick={nextPage}>הבא</button>
                    <button type="button" onClick={handleDebugSubmit}>שלח (Debug)</button>
                </div>
            )}

            {page === 4 && (
                <div>
                    <div className="survey-description">
                        <p>נסה להתמקד בכאב שלך, ותאר את מיקומו במדויק, היכן אתה חש אותו ביחס למקום אותו תיארת מקודם?</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="painLocation">8. איפה את/ה מרגיש/ה את הכאב?</label>
                        <select id="painLocation" name="painLocation" value={formData.painLocation} onChange={handleChange} required>
                            <option value="">בחר/י מיקום</option>
                            <option value="ראש">ראש</option>
                            <option value="צוואר">צוואר</option>
                            <option value="כתפיים">כתפיים</option>
                            <option value="גב">גב</option>
                            <option value="בטן">בטן</option>
                            <option value="אגן">אגן</option>
                            <option value="ירכיים">ירכיים</option>
                            <option value="ברכיים">ברכיים</option>
                            <option value="רגליים">רגליים</option>
                            <option value="קרסוליים">קרסוליים</option>
                            <option value="כפות רגליים">כפות רגליים</option>
                            <option value="ידיים">ידיים</option>
                            <option value="מרפקים">מרפקים</option>
                            <option value="חזה">חזה</option>
                            <option value="עיניים">עיניים</option>
                            <option value="אוזניים">אוזניים</option>
                            <option value="אף">אף</option>
                            <option value="שיניים">שיניים</option>
                            <option value="לשון">לשון</option>
                            <option value="גרון">גרון</option>
                            <option value="עורף">עורף</option>
                            <option value="כתף">כתף</option>
                            <option value="עצם הבריח">עצם הבריח</option>
                            <option value="צלעות">צלעות</option>
                            <option value="כל הגוף">כל הגוף</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>9. צד הכאב:</label>
                        <div className="scale-container">
                            <span>ימין</span>
                            <input type="range" name="painSide" min="0" max="5" value={formData.painSide} onChange={handleChange} required />
                            <span>שמאל</span>
                        </div>
                        <div className="scale-value">{formData.painSide}</div>
                    </div>
                    <div className="form-group">
                        <label>10. כיוון הכאב:</label>
                        <div className="scale-container">
                            <span>קדימה</span>
                            <input type="range" name="painDirection" min="0" max="5" value={formData.painDirection} onChange={handleChange} required />
                            <span>אחורה</span>
                        </div>
                        <div className="scale-value">{formData.painDirection}</div>
                    </div>
                    <div className="form-group">
                        <label>11. מיקום אנכי:</label>
                        <div className="scale-container">
                            <span>למעלה</span>
                            <input type="range" name="painVertical" min="0" max="5" value={formData.painVertical} onChange={handleChange} required />
                            <span>למטה</span>
                        </div>
                        <div className="scale-value">{formData.painVertical}</div>
                    </div>
                    <div className="form-group"> 
                        <label htmlFor="painDetails2">12. תיאור מפורט של הכאב:</label>
                        <textarea id="painDetails2" name="painDetails2" rows="4" value={formData.painDetails2} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="painOrgan">13. קרוב לאיזה איבר בגוף:</label>
                        <input type="text" id="painOrgan" name="painOrgan" value={formData.painOrgan} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="painStartEnd">14. היכן הוא מתחיל והיכן הוא נגמר:</label>
                        <input type="text" id="painStartEnd" name="painStartEnd" value={formData.painStartEnd} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="painLength">15. האם הוא ארוך או קצר:</label>
                        <div className="scale-container">
                            <span>קצר</span>
                            <input type="range" name="painLength" min="0" max="10" value={formData.painLength} onChange={handleChange} required />
                            <span>ארוך</span>
                        </div>
                        <div className="scale-value">{formData.painLength}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="painThickness">16. האם הוא עמוק או שטוח?:</label>
                        <div className="scale-container">
                            <span>שטוח</span>
                            <input type="range" name="painThickness" min="0" max="10" value={formData.painThickness} onChange={handleChange} required />
                            <span>עמוק</span>
                        </div>
                        <div className="scale-value">{formData.painThickness}</div>
                    </div>
                    <button type="button" onClick={prevPage}>הקודם</button>
                    <button type="button" onClick={nextPage}>הבא</button>
                </div>
            )}

            {page === 5 && (
                <div>
                    <div className="form-group">
                        <label htmlFor="painColor">17. אם היית יכול לראות את הכאב שלך, באיזה צבע הוא?</label>
                        <input type="text" id="painColor" name="painColor" value={formData.painColor} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>18. האם הצורה שלו חדה/עגולה:</label>
                        <div className="scale-container">
                            <span>עגולה</span>
                            <input type="range" name="painShape" min="0" max="5" value={formData.painShape} onChange={handleChange} required />
                            <span>חדה</span>
                        </div>
                        <div className="scale-value">{formData.painShape}</div>
                    </div>
                    <div className="form-group">
                        <label>19. האם הגבול שלו מוגדר /מטושטש:</label>
                        <input type="radio" name="painBorder" value="מוגדר" checked={formData.painBorder === 'מוגדר'} onChange={handleChange} required /> מוגדר
                        <input type="radio" name="painBorder" value="מטושטש" checked={formData.painBorder === 'מטושטש'} onChange={handleChange} required /> מטושטש
                    </div>
                    <div className="form-group">
                        <label>20.  אם היית יכול לגעת בכאב איזה מרקם יש לו? (סמיך/דליל):</label>
                        <div className="scale-container">
                            <span>דליל</span>
                            <input type="range" name="painDensity" min="0" max="5" value={formData.painDensity} onChange={handleChange} required />
                            <span>סמיך</span>
                        </div>
                        <div className="scale-value">{formData.painDensity}</div>
                    </div>
                    <div className="form-group">
                        <label>21. אם היית יכול ללטף אותו איזה מרקם יש לו? (מחוספס/חלק):</label>
                        <div className="scale-container">
                            <span>חלק</span>
                            <input type="range" name="painTexture" min="0" max="5" value={formData.painTexture} onChange={handleChange} required />
                            <span>מחוספס</span>
                        </div>
                        <div className="scale-value">{formData.painTexture}</div>
                    </div>
                    <div className="form-group">
                        <label>22. אם היית יכול להחזיק ביד וללחוץ, איזה מרקם יש לו? (קשה/רך):</label>
                        <div className="scale-container">
                            <span>רך</span>
                            <input type="range" name="painHardness" min="0" max="5" value={formData.painHardness} onChange={handleChange} required />
                            <span>קשה</span>
                        </div>
                        <div className="scale-value">{formData.painHardness}</div>
                    </div>
                    <div className="form-group">
                        <label>23. איזה מילים היית בוחר כדי לתאר בצורה הטובה ביותר את תחושת הכאב שלך:</label>
                        <input type="checkbox" name="painDescription" value="חד" onChange={handleChange} /> חד
                        <input type="checkbox" name="painDescription" value="דקירה" onChange={handleChange} /> דקירה
                        <input type="checkbox" name="painDescription" value="עקצוץ" onChange={handleChange} /> עקצוץ
                        <input type="checkbox" name="painDescription" value="שריפה" onChange={handleChange} /> שריפה
                        <input type="checkbox" name="painDescription" value="ירי" onChange={handleChange} /> ירי
                        <input type="checkbox" name="painDescription" value="מגרד" onChange={handleChange} /> מגרד
                        <input type="checkbox" name="painDescription" value="פעימה" onChange={handleChange} /> פעימה
                        <input type="checkbox" name="painDescription" value="נימול" onChange={handleChange} /> נימול
                    </div>
                    <div className="form-group">
                        <label>24. האם יש דמויות /  סמלים או תמונות שעולים לך בראש כשאתה חושב על הכאב שלך?:</label>
                        <input type="radio" name="painSymbols" value="כן" checked={formData.painSymbols === 'כן'} onChange={handleChange} required /> כן
                        <input type="radio" name="painSymbols" value="לא" checked={formData.painSymbols === 'לא'} onChange={handleChange} required /> לא
                    </div>
                    <div className="form-group">
                        <label>25. האם אתה מרגיש שהכאב זז:</label>
                        <input type="radio" name="painMovement" value="כן" checked={formData.painMovement === 'כן'} onChange={handleChange} required /> כן
                        <input type="radio" name="painMovement" value="לא" checked={formData.painMovement === 'לא'} onChange={handleChange} required /> לא
                    </div>
                    <div className="form-group">
                        <label>26. אם כן האם יש לו קצב מסוים?</label>
                        <select name="painRhythm" value={formData.painRhythm} onChange={handleChange} required>
                            <option value="איטי">איטי</option>
                            <option value="מהיר">מהיר</option>
                            <option value="קופצני">קופצני</option>
                            <option value="זורם">זורם</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>27. איזה צליל מתאר אותו:</label>
                        <select name="painSound" value={formData.painSound} onChange={handleChange} required>
                            <option value="איטי ומלנכולי">איטי ומלנכולי</option>
                            <option value="קצבי היפ הופ כבדים ואפלים">קצבי היפ הופ כבדים ואפלים</option>
                            <option value="רוק דרמטי ועוצמתי">רוק דרמטי ועוצמתי</option>
                            <option value="אופרה או כלי נגינה קלאסיים">אופרה או כלי נגינה קלאסיים</option>
                            <option value="אלקטרוניקה עכורה ומינימליסטית">אלקטרוניקה עכורה ומינימליסטית</option>
                            <option value="פולק עדין ואקוסטי">פולק עדין ואקוסטי</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>28. איך היית מתאר את דפוס הזמן של הכאב שלך:</label>
                        <select name="painPattern" value={formData.painPattern} onChange={handleChange} required>
                            <option value="קבוע">קבוע</option>
                            <option value="לסירוגין">לסירוגין</option>
                            <option value="לא סדיר">לא סדיר</option>
                            <option value="מחמיר עם הזמן">מחמיר עם הזמן</option>
                            <option value="משתפר עם הזמן">משתפר עם הזמן</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="painActivitiesWorsen">29. מה גורם להחמרה בכאב - האם ישנן פעילויות, תנועות או גורמים אחרים המעוררים או מחמירים את הכאב שלך? בבקשה תתאר.:</label>
                        <textarea id="painActivitiesWorsen" name="painActivitiesWorsen" rows="4" value={formData.painActivitiesWorsen} onChange={handleChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="painActivitiesRelieve">30. מה עוזר לך להתמודד עם הכאב? האם ישנן פעילויות או תנועות או גורמים אחרים שגורמים להקלה בכאב שלך? בבקשה תתאר.:</label>
                        <textarea id="painActivitiesRelieve" name="painActivitiesRelieve" rows="4" value={formData.painActivitiesRelieve} onChange={handleChange} required></textarea>
                    </div>
                    <button type="button" onClick={prevPage}>הקודם</button>
                    <button type="submit">שלח</button>
                </div>
            )}
        </form>
    );
};

export default PainSurveyForm;
