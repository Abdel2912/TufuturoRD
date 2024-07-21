import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Cargar los datos desde un archivo CSV
df = pd.read_csv('career_data.csv')

# Separar características (X) y objetivo (y)
X = df.drop('carrera', axis=1)
y = df['carrera']

# Convertir características categóricas a numéricas usando pd.get_dummies
X = pd.get_dummies(X)

# Crear el modelo
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Entrenar el modelo
model.fit(X, y)

# Guardar el modelo entrenado en un archivo .pkl
joblib.dump(model, 'career_recommendation_model.pkl')

# Guardar las columnas del modelo en un archivo .pkl
model_columns = X.columns.tolist()
joblib.dump(model_columns, 'model_columns.pkl')

print("Modelo y columnas guardados exitosamente.")








