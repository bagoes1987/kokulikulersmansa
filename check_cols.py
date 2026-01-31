import pandas as pd

def check_columns():
    file_path = r'd:\Aplikasi Web AI\LP Kokulikuler SMAN 1 Belitang\DAFTAR KOORDINATOR DAN FASILITAOTOR.xlsx'
    df = pd.read_excel(file_path, sheet_name='KOORDINATOR')
    print("Columns found:")
    print(df.columns.tolist())
    print("\nFirst 2 rows:")
    print(df.head(2).to_string())

if __name__ == "__main__":
    check_columns()
