# *PalProfe* 

## Aplicación de gestión para los docentes

![PalProfe](https://i.gyazo.com/fe4201e853d71e7abdb453caf96ddf1a.png)

## Pasos para ejecutar el servidor backend en local:
### 1. Instalar python
### 2. Clonar el repositorio `git clone https://github.com/footalentgroup/Team-15.git`
### 3. Crear un entorno virtual y activarlo
```
python -m venv venv

# Para Linux
source venv/bin/activate
# Para Windows
.\venv\Scripts\activate
```

### 4. Ingresar a la ruta backend/core_app/ y ejecutar estos comandos
```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
