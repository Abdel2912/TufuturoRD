import sys
import json
import joblib
import pandas as pd

# Cargar el modelo y las columnas
model = joblib.load('career_recommendation_model.pkl')
model_columns = joblib.load('model_columns.pkl')

def main():
    try:
        input_data = sys.stdin.read()
        
        if not input_data:
            print(json.dumps({"error": "No input data received"}))
            return

        data = json.loads(input_data)
        user_data = pd.DataFrame([data])
        user_data = pd.get_dummies(user_data)
        user_data = user_data.reindex(columns=model_columns, fill_value=0)
        
        prediction = model.predict(user_data)
        career = prediction[0]
        
        print(json.dumps({"career": career}, ensure_ascii=False))
    
    except json.JSONDecodeError:
        print(json.dumps({"error": "Error decoding JSON"}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()












